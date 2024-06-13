export function sortMedia(mediaObjects, criterion) {
    const sortedMedia = [...mediaObjects];
    if (criterion === 'popularité') {
        sortedMedia.sort((a, b) => b.likes - a.likes);
    } else if (criterion === 'date') {
        sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (criterion === 'titre') {
        sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedMedia;
}
