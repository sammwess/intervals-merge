import express from 'express';
import { IntervalsMerge } from './intervals-merge';


const app = express();
const port = 3000;
const input = [[1, 3], [5, 8], [4, 10], [20, 25]];

app.get('/v1', (req, res) => {

  // Input object  
  console.log(input);
  console.time('V1 Execution time');
  // Output object
  let output = (new IntervalsMerge()).merge(input);
  console.timeEnd('V1 Execution time');
  console.log(output);

  // Output JSON
  let jsonResult = { input: JSON.stringify(input), output: JSON.stringify(output) };
  // Response
  res.send(jsonResult);
});

app.get('/v2', (req, res) => {

  // Input object
  console.log(input);
  console.time('V2 Execution time');
  // Output object
  let output = (new IntervalsMerge()).merge(input);
  console.timeEnd('V2 Execution time');
  console.log(output);

  // Output JSON
  let jsonResult = { input: JSON.stringify(input), output: JSON.stringify(output) };
  // Response
  res.send(jsonResult);
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
}).on('error', (e) => {
  return console.log('Error happened: ', e.message)
});
