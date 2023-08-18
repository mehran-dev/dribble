import { ProjectForm } from "@/common.types";
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
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};
export const createUser = async (
  name: string,
  email: string,
  avatarUrl: string
) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);
  if (imageUrl.url) {
    return makeGraphQLRequest(createProjectMutation, variables);
  }
};
