//this handles random words API integration

import axios from "axios";

const endpoint = "https://random-words-api.vercel.app/word";

const getWord = async () => {
  const res = await axios.get(endpoint);
  return res.data;
};

export default { getWord };
