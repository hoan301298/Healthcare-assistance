import { Mistral } from "@mistralai/mistralai";
import { constants } from "../../../constant.js";
import { decrypt } from "../../helper/cryptoFunctions.js";

const mistral = new Mistral({
    apiKey: constants.MISTRAL_API_KEY,
});

export const buildMistralMessages = (messages) => {
    return messages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: decrypt(m.text),
    }));
};

export const getMistralReply = async (chatMessages) => {
    const response = await mistral.chat.complete({
        model: "mistral-small-latest",
        messages: chatMessages,
        temperature: 0.7,
        maxTokens: 300,
    });

    return response.choices[0].message.content;
};