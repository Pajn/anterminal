import * as React from 'react';
import {command} from './decorators';
import {Chart} from '../../components/chart';

// Hack to workaround unused React bug in tslint
export const _ = React;

class Renders {

  @command()
  table(data: Object[]) {
    const columns = Object.keys(data[0] || {});

    return <table>
      <thead>
        <tr>
          {columns.map(column => <th>{column}</th>)}
        </tr>
      </thead>
    </table>;
  }

  @command()
  chart(data: number[]) {
    return <Chart data={data} />;
  }
}
