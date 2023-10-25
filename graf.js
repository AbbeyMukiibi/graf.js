if (typeof define === 'undefined'){
  alert("please add the define constant");
}
else if (define == "bar"){
const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svg = d3.select("#bar-chart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
.domain(data.map(d => d.label))
.range([0, width])
.padding(0.1);

const y = d3.scaleLinear()
.domain([0, d3.max(data, d => d.value)])
.nice()
.range([height, 0]);

svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("x", d => x(d.label))
.attr("y", d => y(d.value))
.attr("width", x.bandwidth())
.attr("height", d => height - y(d.value))
.attr("fill", bgcolor);

svg.append("g")
.attr("class", "x-axis")
.attr("transform", `translate(0,${height})`)
.call(d3.axisBottom(x));

svg.append("g")
.attr("class", "y-axis")
.call(d3.axisLeft(y));
}
else if (define == "line"){
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svg = d3.select("#line-graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.x)])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.y)])
  .range([height, 0]);

const line = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y));

svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", color)
  .attr("stroke-width", 2)
  .attr("d", line);

// Add x-axis
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Add y-axis
svg.append("g")
  .call(d3.axisLeft(yScale));
}
else if (define == "area"){
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svg = d3.select("#area-graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.x)])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.y)])
  .range([height, 0]);

const area = d3.area()
  .x(d => xScale(d.x))
  .y0(height) // Bottom of the area
  .y1(d => yScale(d.y));

svg.append("path")
  .datum(data)
  .attr("fill",bgcolor)
  .attr("d", area);

// Add x-axis
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Add y-axis
svg.append("g")
  .call(d3.axisLeft(yScale));
}
else if (define == "pie"){
const width = 400;  // Width of the SVG container
const height = 400; // Height of the SVG container
const radius = Math.min(width, height) / 2;

const svg = d3.select("#pie-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);

const color = d3.scaleOrdinal(d3.schemeCategory10);

const pie = d3.pie()
  .sort(null) // Disable sorting by value
  .value(d => d.value);

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);

const arcs = g.selectAll("arc")
  .data(pie(data))
  .enter()
  .append("g");

arcs.append("path")
  .attr("d", arc)
  .attr("fill", d => color(d.data.label));

// Add labels
const label = d3.arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40);

arcs.append("text")
  .attr("transform", d => `translate(${label.centroid(d)})`)
  .attr("dy", "0.35em")
  .text(d => d.data.label);
}
else if (define == "scatter"){
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#scatter-plot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.x)]) // Set the x-axis domain based on your data
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.y)]) // Set the y-axis domain based on your data
  .range([height, 0]);

svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.x))
  .attr("cy", d => yScale(d.y))
  .attr("r", dotconfig[1]) // Circle radius
  .attr("fill", dotconfig[0]); // Circle color

// Add x-axis
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Add y-axis
svg.append("g")
  .call(d3.axisLeft(yScale));
}
else if (define !== "bar" || define !== "pie" || define !== "scatter" || define !== "line" || define !== "area") {
  var message = "Wrongly defined `"+define+"' is not available in Graf js";
  alert(message)
}
