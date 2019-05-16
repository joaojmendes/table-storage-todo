import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import DataService from '../lib/dataService';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
    const taskId = req.query.taskId || (req.body && req.body.taskId);
    const dataService = new DataService('todos');
  if (taskId) {
    const entity = {
      PartitionKey: 'Part1',
      RowKey: taskId,
    };
    const res = await dataService.getEntity(entity.PartitionKey, entity.RowKey)
    context.res = {
      body: res
    };
    
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a task Id on the query string or in the request body'
    };
  }
};

export default httpTrigger;