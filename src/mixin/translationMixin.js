import axios from "axios"

export default {
  methods: {
    async translate(text) {
      const encodedParams = new URLSearchParams()
      encodedParams.append("from", "en")
      encodedParams.append("to", "vi")
      encodedParams.append("text", text)

      const options = {
        method: "POST",
        url: "https://translo.p.rapidapi.com/api/v3/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "b8a96d1ca1msh2d5203eaa785f1fp130238jsna0941ed6f213",
          "X-RapidAPI-Host": "translo.p.rapidapi.com",
        },
        data: encodedParams,
      }

      try {
        const response = await axios.request(options)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
