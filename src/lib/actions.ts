import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProd = process.env.NODE_ENV === "production";
const apiURL = isProd
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "https://127.0.0.1:4000/graphql";

const apiKey = isProd ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "" : "1234";
const serverUrl = isProd
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";
const client = new GraphQLClient(apiURL);
const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = async (email: string) => {
  return makeGraphQLRequest(getUserQuery, { email });
};
export const createUser = async (
  name: string,
  email: string,
  avatarUrl: string
) => {
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};
