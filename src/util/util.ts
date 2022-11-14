export const freeze = async (ms: number) => {
    await new Promise((resolver) => setTimeout(resolver, ms));
};

export const stringfyJSONOrNull = (json: any): string | undefined => {
    if (!json) return;
    try {
        return JSON.stringify(json);
    } catch (err) {
        return;
    }
};
