import * as dotenv from 'dotenv';
dotenv.config();


export let config = {
    "token": `${process.env.BOT_TOKEN}`,
    "prefix": "?",
    "commands": [
        "testCommand",
        "ama",
        "post",
        "profile",
        "question"
    ]
}