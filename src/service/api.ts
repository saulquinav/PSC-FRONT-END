// Change this to you local machine name URL
const MACHINE_NAME_URL = "andrei-10nm003tri:8080";

export function getBackendBaseAPI(): string
{
    return "http://" + MACHINE_NAME_URL + "/payara.example-0.1-SNAPSHOT/resources";
}