import fetch from "node-fetch"

const executeCode = async (language, code, res) => {
    const supportedLanguages = ["python", "java", "cpp"]

    if (!supportedLanguages.includes(language)) {
        return res.status(400).json({ error: "Unsupported language" })
    }

    try {
        const response = await fetch("http://13.201.193.73/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ language, code })
        })

        const data = await response.json()

        return res.status(response.ok ? 200 : 500).json(data)
    } catch (error) {
        return res.status(500).json({ error: "Execution service unavailable", details: error.message })
    }
}

export default executeCode
