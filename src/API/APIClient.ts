
import axios, { AxiosInstance } from 'axios';

/* 
* BaseAPIClient is an abstract class that will be used to create the API client for the different endpoints. Ideally I'll use this for more than linkedin
* method is to be used when I need to specify the method of the request, but for now I'm just using POST because the API I'm using requires it
*/
export abstract class BaseAPIClient {
  protected httpClient: AxiosInstance;
  protected apiKey: string;
  protected endpoint: string;
  // protected method: string;

  constructor(apiKey: string, endpoint: string, /*method: string*/) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
    // this.method = method;
    this.httpClient = axios.create({
      baseURL: this.endpoint,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  public abstract fetchData(params: any): Promise<any>;
}
