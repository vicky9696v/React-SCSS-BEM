import {Component} from "react"

import "../App.scss"

import * as d3 from 'd3';

class Graph extends Component {
 

  componentDidMount(){
    if(this.props.RenderComponentGraph){
      window.location.href = '/'
    }
    const sample = [
      {
        language: 'Rust',
        value: 78.9,
        color: '#000000'
      },
      {
        language: 'Kotlin',
        value: 35.1,
        color: '#00a2ee'
      },
      {
        language: 'Python',
        value: 68.0,
        color: '#fbcb39'
      },
      {
        language: 'TypeScript',
        value: 27.0,
        color: '#007bc8'
      },
      {
        language: 'Go',
        value: 45.6,
        color: '#65cedb'
      },
     
      {
        language: 'JavaScript',
        value: 81.9,
        color: '#f9de3f'
      },
     
    ];

    const svg = d3.select('svg');
    
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.language))
      .padding(0.4)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100]);
    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(sample)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.language))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.language) - 5)
          .attr('width', xScale.bandwidth() + 10)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          })

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.language))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.value}%`)
    
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Love meter (%)')
  }

  render() {
    
    return (
        <div className="Graph">
        
        <div id='layout'>
           <h2>Bar chart example</h2> 
          <div id='container'>
            <svg />
          </div>
          

        </div> 
        </div>
    )
  }
}
export default Graph;