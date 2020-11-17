import React from "react";
import Grid from "@material-ui/core/Grid";

import Axios from "axios";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: {},
      amount: {},
    };
  }

  async componentDidMount() {
    const connectedUser = JSON.parse(localStorage.getItem("user"));
    if (!localStorage.getItem("user") || !connectedUser.isAdmin) {
      this.props.history.push("/");
    }
    const distanceVendor1 = await Axios.get("http://localhost:5000/distance/1");
    const distanceVendor2 = await Axios.get("http://localhost:5000/distance/2");
    const amountVendor1 = await Axios.get("http://localhost:5000/amount/1");
    const amountVendor2 = await Axios.get("http://localhost:5000/amount/2");
    //update statistics
    await Axios.get("http://localhost:5000/statistic/1/1");
    await Axios.get("http://localhost:5000/statistic/1/2");
    await Axios.get("http://localhost:5000/statistic/2/1");
    await Axios.get("http://localhost:5000/statistic/2/2");
    this.createPieChart(
      "distance",
      distanceVendor1.data.distance,
      distanceVendor2.data.distance
    );
    this.createPieChart(
      "amount",
      amountVendor1.data.amount,
      amountVendor2.data.amount
    );
  }
  createPieChart(statisticType, vendor1Value, vendor2Value) {
    const vendor1Percentage =
      (vendor1Value / (vendor1Value + vendor2Value)) * 100;
    const vendor2Percentage =
      (vendor2Value / (vendor1Value + vendor2Value)) * 100;
    this.setState({
      [statisticType]: {
        theme: "dark2",
        animationEnabled: true,
        exportFileName: statisticType + " statistics",
        exportEnabled: true,
        title: {
          text: "the total " + statisticType + " covered during the mornings",
        },
        data: [
          {
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{value}</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: [
              { y: vendor1Percentage, label: "Vendor 1", value: vendor1Value },
              { y: vendor2Percentage, label: "Vendor 2", value: vendor2Value },
            ],
          },
        ],
      },
    });
  }
  render() {
    const { distance, amount } = this.state;
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CanvasJSChart
            options={distance}
            /* onRef={ref => this.chart = ref} */
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CanvasJSChart
            options={amount}
            /* onRef={ref => this.chart = ref} */
          />
        </Grid>
        <h2>Vendor 1 statistic distance and amout Per Hour</h2>
        <Grid item xs={12}>
          <Grid item xs={12} sm={6}>
            <h3>
              Statistics of distance covered by Vendor 1 during the morning
            </h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              className=""
              alt="logo brand nobo noir"
              src={require("../images/distance_1.png")}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sm={6}>
            <h3>
              Statistics of collected fairs by Vendor 1 during the morning
            </h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              className=""
              alt="logo brand nobo noir"
              src={require("../images/fairs_1.png")}
            />
          </Grid>
        </Grid>
        <h2>Vendor 2 statistic distance and amount Per Hour</h2>
        <Grid item xs={12}>
          <Grid item xs={12} sm={6}>
            <h3>
              Statistics of distance covered by Vendor 2 during the morning
            </h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              className=""
              alt="logo brand nobo noir"
              src={require("../images/distance_2.png")}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} sm={6}>
            <h3>
              Statistics of collected fairs by Vendor 2 during the morning
            </h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              className=""
              alt="logo brand nobo noir"
              src={require("../images/fairs_2.png")}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default Dashbord;
