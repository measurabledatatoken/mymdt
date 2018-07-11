import axios from 'axios';
import { schema } from 'normalizr';

import handleGeneralResponse from './helper';
import { APIEndPoint, APIScheme } from './constants';

const applicationSchema = new schema.Entity(
  'applications',
  {},
  {
    idAttribute: 'application_id',
  },
);
const applicationsSchema = [applicationSchema];

export default {
  getApplications(accessToken) {
    const promise = axios.get(
      `${APIScheme}://${APIEndPoint}/account/registered-apps`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return handleGeneralResponse(promise, {
      schema: applicationsSchema,
    });
  },
};
