const BASE_URL = "";

export function getBackendBaseAPI(): string
{
    return "http://" + BASE_URL + "/payara.example-0.1-SNAPSHOT/resources";
}