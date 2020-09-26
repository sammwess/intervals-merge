import { json } from 'body-parser';
import express from 'express';
import { IntervalsMerge } from './intervals-merge';


const app = express();
const port = 3000;
app.get('/', (req, res) => {

  // Input object
  let input = [[1, 3], [5, 8], [4, 10], [20, 25]];
  console.log(input);
  
  // Output object
  let output = (new IntervalsMerge()).merge(input);
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
