import {DynamoDBClient, GetItemCommand, PutItemCommand} from "@aws-sdk/client-dynamodb";

export const storeAccessCode = async (address: string, accessCode: string, collectionId: string) => {
  const client = getClient()
  const item = {
    id: { S: accessCode },
    access_code: { S: accessCode },
    address: { S: address },
    collection_id: {S: collectionId}
  }

  try {
    const putItemCommand = new PutItemCommand({
      TableName: "access_codes",
      Item: item,
    });
    const response = await client.send(putItemCommand);
    console.log("Successfully added item: ", response);
  } catch (error) {
    console.error("Error: ", error);
  }
}

export const getByAccessCode = async (accessCode: string) => {
  const client = getClient()
  const params = {
    TableName: 'access_codes',
    Key: {
      'id': accessCode,
      'access_code': accessCode,
    }
  }
  const getItemCommand = new GetItemCommand({
    TableName: "access_codes",
    Key: {
      id: { S: accessCode },
    },
  });


  try {
    const response = await client.send(getItemCommand);
    console.log("조회된 아이템:", response.Item);
    return response.Item;
  } catch (error) {
    console.error("Error: ", error);
  }
}


const getClient = () => {
  return new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID || '',
      secretAccessKey: process.env.AWS_ACCESS_KEY || '',
    },
    region: process.env.AWS_REGION_KEY || ''
  })
}

