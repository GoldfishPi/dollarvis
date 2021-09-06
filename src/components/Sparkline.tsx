import React from 'react'
import { scaleTime, extent, scaleLinear, max, min, line, curveMonotoneX, area } from 'd3'

const testData: [number, number][] = [
  [0, 0],
  [1, 2],
  [2, 4],
  [3, 8],
  [4, 16]
]

const MARGINS = {
  top: 10,
  bottom: 45,
  left: 45,
  right: 10
}

export const Sparkline: React.FC<{
  width: number
  height: number
  data: [number, number][]
}> = ({ width, height, data = testData }) => {
  const graphWidth = width - MARGINS.left - MARGINS.right
  const graphHeight = height - MARGINS.top - MARGINS.bottom

  if (!data.length) return <></>
  const x = scaleLinear()
    .range([0, graphWidth])
    .domain(extent(data, (d) => d[0]))

  const y = scaleLinear()
    .range([graphHeight, 0])
    .domain(extent(data, (d) => d[1]))

  const l = line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]))
    .curve(curveMonotoneX)(data)
  const a = area()
    .y0(graphHeight)
    .y1((d) => y(d[1]))
    .x((d) => x(d[0]))
    .curve(curveMonotoneX)(data)

  return (
    <div>
      <svg width={width} height={height} fill="green">
        <g width={graphWidth} height={graphHeight} transform={`translate(${MARGINS.left}, ${MARGINS.top})`}>
          <g className="axis">
            <line x1={0} x2={graphWidth} y1={graphHeight} y2={graphHeight} stroke="var(--text)" strokeWidth={5} strokeDasharray="10" />
            <line x1={0} x2={0} y1={0} y2={graphHeight} stroke="var(--text)" strokeWidth={5} strokeDasharray="10" />
          </g>
          <g className="chart">
            <path d={a || ''} fill="url(#gradient)" strokeWidth={4} />
            <path d={l || ``} stroke="var(--white)" fill="none" strokeWidth={4} />
            <g transform={`translate(${x(data[data.length - 1][0])} ${y(data[data.length - 1][1])})`}>
              <rect width={10} height={10} fill="var(--white)" transform="rotate(45) translate(-5 -5)" />
            </g>
          </g>
        </g>
        <g className="legend">
          <text x={0} y={0 + 20} fill="var(--text)">
            {max(data, (d) => d[1])}
          </text>
          <text x={0} y={graphHeight} fill="var(--text)">
            {min(data, (d) => d[1])}
          </text>
          <text y={height} x={MARGINS.left} fill="var(--text)">
            {min(data, (d) => d[0])}
          </text>
          <text y={height} x={width - MARGINS.right} textAnchor="end" fill="var(--text)">
            {max(data, (d) => d[0])}
          </text>
        </g>

        <defs>
          <linearGradient id="gradient" y2={0} x1={1} x2={1} y1={1}>
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="var(--white)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
