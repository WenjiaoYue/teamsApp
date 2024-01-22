import fetch from 'node-fetch';
// import { getConfig, mode } from "../config";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function fetchTextContent(keyword) {
    // const url = 'http://10.7.182.176:8000/v1/askdoc/chat'
    const url = 'http://10.239.158.137:3000/post'
    const rs = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": keyword,
            "id": 1
        }),
    });    

    return await rs.json();
}

export {
    fetchTextContent
}