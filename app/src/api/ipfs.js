import axios from 'axios';
import { BASE_URL } from './config';

export async function storeImage(image) {
  const form = new FormData();
  form.append('file', image);

  return await axios.post(BASE_URL + 'pin-image', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export async function generateAndStoreImage(templateNumber, fontColor, cityName) {
  return await axios.get(BASE_URL + 'generate-image/' + templateNumber + '/' + cityName + '/' + fontColor);
}