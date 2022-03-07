import { NextApiRequest, NextApiResponse } from 'next';
import { findProvider } from '@symbio/cms';
import symbio from '../../../symbio.config.json';
import blocks from '../../blocks/server';
import providers from '../../providers';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'POST') {
        res.status(405).end('Method not allowed');
        return;
    }

    const { environment, entity_type, event_type, entity } = req.body;
    const typeId: string = entity.relationships.item_type.data.id;

    if (environment !== 'main' || entity_type !== 'item' || (event_type !== 'publish' && event_type !== 'unpublish')) {
        res.status(204).end('Event not applicable');
        return;
    }

    try {
        const provider = findProvider(typeId, providers);
        if (provider && provider.getPathsToRevalidate) {
            const paths = await provider.getPathsToRevalidate(entity, providers, blocks, symbio.i18n);
            if (paths && paths.length > 0) {
                const promises = paths.map((path) => res.unstable_revalidate(path));
                await Promise.all(promises);
                res.json({
                    status: 'OK',
                    paths,
                });
                return;
            }
        }
        res.json({
            status: 'OK',
            paths: [],
        });
        return;
    } catch (e) {
        console.error(e);
        res.status(500).end(e instanceof Error ? e.message : 'Unknown error');
        return;
    }
}
