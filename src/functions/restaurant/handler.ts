import { APIGatewayProxyHandler } from 'aws-lambda';
import { AWSResponse, DatabaseManager } from '@libs/index';
import axios from 'axios';
import { Transaction, User } from "@entities/index";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const nearby: APIGatewayProxyHandler = async (event) => {
  const { location, radius, type } = event.queryStringParameters;
  const userId = event.requestContext.authorizer.principalId;

  try {
    const manager = await DatabaseManager.getManager();

    const user = await manager.findOne(User, { where: { id: userId } });

    if (!user) {
      return AWSResponse(404, { message: 'User not found' });
    }

    let coordinates = location;

    // If the location is a city name, it gets the coordinates
    if (!location.includes(',')) {
      const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: location,
          key: GOOGLE_API_KEY
        }
      });

      if (geocodeResponse.data.results.length === 0) {
        return AWSResponse(404, { message: 'Location not found' });
      }

      const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
      coordinates = `${lat},${lng}`;
    }

    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: coordinates,
        radius,
        type: type || 'restaurant',
        key: GOOGLE_API_KEY
      }
    });

    // save the transaction
    const transaction = new Transaction();
    transaction.user = user.email;
    transaction.type = type || 'restaurant';
    transaction.location = location;
    transaction.distance = parseFloat(radius);

    await manager.save(transaction);

    return AWSResponse(200, response.data);
  } catch (error) {
    console.error('ERROR =>', error);
    return AWSResponse(500, { message: 'Internal Server Error' });
  }
};
