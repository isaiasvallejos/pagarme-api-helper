
export default async () => {
    try {
        const response = await fetch('https://bin-api.pipedream.com/api/v2/http_endpoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": "Pagar.me API Helper - Transaction",
                "pvt": false
            })
        })
        const { data } = await response.json()
        return { postback_url: `https://${data.api_key}.x.pipedream.net/`, postback_follow_url: `https://requestbin.com/r/${data.api_key}` }
    } catch (error) {
        alert('Erro ao gerar postback, por favor tente mais tarde.')
    }
}