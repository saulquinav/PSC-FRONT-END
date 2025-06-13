import { BASE_URL } from "../secrets/url";

// const BASE_URL = "";


export function getBackendBaseApiUrl(): string
{
    return BASE_URL + ":8080/payara.example-0.1-SNAPSHOT/resources";
}