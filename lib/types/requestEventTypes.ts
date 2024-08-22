interface baseRequestEventPayload {
    _type: string
}

export interface EmotePayload extends baseRequestEventPayload {
    emoteId: string,
    targetUserId: string
}