import axios from 'axios';
import { BASE_URL } from './config';

export async function storeImage(name, description, external_link, gps, image) {
  const form = new FormData();
  form.append('file', image);
  form.append('name', name);
  form.append('description', description);
  form.append('external_link', external_link);
  form.append('gps', gps);

  return await axios.post(BASE_URL + 'pin-image', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export async function storeImageFromTemplate(name, description, external_link, gps, fontColor, template) {
  return await axios({
    method: 'post',
    url: BASE_URL + 'generate-metadata',
    data: {
      name: name,
      description: description,
      external_link: external_link,
      gps: gps,
      fontColor: fontColor,
      template: template
    }
  });
}

export async function getTokenMetadata(uri) {
  return await axios.get("https://gateway.pinata.cloud/ipfs/" + uri.substring(7), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}