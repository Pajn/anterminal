import * as React from 'react';

type MinMax = {
  min: number,
  max: number,
  length: number,
  span: number;
};

const padding = 10;
const axisWidth = 50;

export class Chart extends React.Component<{data: number[]}, {width: number, height: number}> {

  constructor(props) {
    super(props);

    this.state = {width: 0, height: 0};
  }

  componentDidMount() {
    this.setState({
      width: (this.refs as any).svg.offsetWidth,
      height: (this.refs as any).svg.offsetHeight,
    });
  }

  getData() {
    let min = this.props.data[0];
    let max = min;

    this.props.data.forEach(dp => {
      min = Math.min(min, dp);
      max = Math.max(max, dp);
    });

    return {min, max, length: max - min, span: max + min};
  }

  render() {
    return (
      <svg width='100%' height='100%' ref='svg'>
        {this.renderChart()}
      </svg>
    );
  }

  private renderChart() {
    const data = this.getData();

    if (!this.state.width || !this.state.height) {
      return;
    }

    return <g>
      {this.renderAxis(data)}
      {this.renderDiagram(data)}
    </g>;
  }

  private renderAxis({min, length}: MinMax) {
    const labels = [];

    const diagramHeight = (this.state.height - padding * 2);
    const labelCount = Math.round(Math.log10(diagramHeight) * 1.5);
    const positionStep = diagramHeight / (labelCount - 1);

    for (let i = 0; i < labelCount; i++) {
      const position = ((diagramHeight - (positionStep * (i))));
      const percentageOfSpan = (diagramHeight - position) / diagramHeight;

      labels.push({
        x: padding + axisWidth / 2,
        y: position + padding,
        text: Math.round((min + length * percentageOfSpan) * 10) / 10,
      });
    }

    return <g>
      {labels.map((label, index) =>
          <text x={label.x} y={label.y} textAnchor='end' key={index}>{label.text}</text>)}
    </g>;
  }

  private renderDiagram(data: MinMax): JSX.Element | JSX.Element[] {
    const diagramHeight = (this.state.height - padding * 2);
    const diagramWidth = (this.state.width - padding * 2 - axisWidth);
    let xScale = diagramWidth / this.props.data.length;
    const yScale = diagramHeight / data.length;

    const yMin = data.min;
    const stop = (x, y) => `${x * xScale + axisWidth}, ` +
                           `${diagramHeight + padding - (Math.max(y, yMin) - yMin) * yScale}`;

    let line = `M ${stop(0, data.min)} L ${stop(0, this.props.data[0])}`;

    this.props.data.slice(1).forEach((y, index) => (line += ` ${stop(index + 1, y)}`));

    line += ` L ${stop(this.props.data.length - 1, data.min)}`;

    return <path d={line} strokeWidth={3} stroke='black' fill='green' />;
  }
}
