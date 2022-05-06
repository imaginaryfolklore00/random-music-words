//this handles MusicBrainz API integration

import axios from "axios";

const baseUrl =" https://musicbrainz.org/ws/2";

const getRecordings = async title => {
  const res = await axios.get(`${baseUrl}/recording/?query=recording:${title}&fmt=json`);
  return res.data;
};

export default { getRecordings };