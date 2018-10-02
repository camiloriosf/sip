//@flow

// import { apiConstants } from "../_constants";

const hourlyData = ({
  selected,
  timeFilter,
  moneyFilter,
  from,
  to,
  results
}: {
  selected: Array<Object>,
  timeFilter: string,
  moneyFilter: string,
  from: string,
  to: string,
  results: Object
}) => {
  try {
    const labels = [];
    const datasets = [];
    const fromDate = from.clone().startOf("d");
    const toDate = to.clone().endOf("d");
    let safe = 0;
    while (safe < 1000000 && !fromDate.isSameOrAfter(toDate)) {
      fromDate.add(1, "h");
      const date = fromDate.format("YYYY-MM-DD");
      const time = fromDate.format("HH:mm");
      if (time === "23:00") {
        labels.push(`${date} ${time}`);
        labels.push(`${date} 24:00`);
      } else if (time !== "00:00") {
        labels.push(`${date} ${time}`);
      }
      safe++;
    }

    for (const item of selected) {
      if (
        results[item.mnemotecnico] &&
        results[item.mnemotecnico][timeFilter]
      ) {
        const dataset = {};
        const barra = results[item.mnemotecnico][timeFilter];
        dataset["name"] = item.nombre;
        dataset["data"] = [];
        for (const label of labels) {
          if (barra[label]) {
            dataset["data"].push(barra[label][moneyFilter]);
          } else {
            dataset["data"].push(0);
          }
        }
        datasets.push(dataset);
      }
    }
    return { categories: labels, datasets };
  } catch (error) {
    console.log(error);
    return { categories: [], datasets: [] };
  }
};

const dailyData = ({
  selected,
  timeFilter,
  moneyFilter,
  from,
  to,
  results
}: {
  selected: Array<Object>,
  timeFilter: string,
  moneyFilter: string,
  from: string,
  to: string,
  results: Object
}) => {
  try {
    const labels = [];
    const datasets = [];
    const fromDate = from.clone().startOf("d");
    const toDate = to.clone().endOf("d");
    let safe = 0;
    while (safe < 100000 && !fromDate.isSameOrAfter(toDate)) {
      const date = fromDate.format("YYYY-MM-DD");
      labels.push(date);
      fromDate.add(1, "d");
      safe++;
    }
    for (const item of selected) {
      if (
        results[item.mnemotecnico] &&
        results[item.mnemotecnico][timeFilter]
      ) {
        const dataset = {};
        const barra = results[item.mnemotecnico][timeFilter];
        dataset["name"] = item.nombre;
        dataset["data"] = [];
        for (const label of labels) {
          if (barra[label]) {
            dataset["data"].push(barra[label][moneyFilter]);
          } else {
            dataset["data"].push(0);
          }
        }
        datasets.push(dataset);
      }
    }
    return { categories: labels, datasets };
  } catch (error) {
    console.log(error);
    return { categories: [], datasets: [] };
  }
};

const monthlyData = ({
  selected,
  timeFilter,
  moneyFilter,
  from,
  to,
  results
}: {
  selected: Array<Object>,
  timeFilter: string,
  moneyFilter: string,
  from: string,
  to: string,
  results: Object
}) => {
  try {
    const labels = [];
    const datasets = [];
    const fromDate = from.clone().startOf("M");
    const toDate = to.clone().endOf("M");
    let safe = 0;
    while (safe < 10000 && !fromDate.isSameOrAfter(toDate)) {
      const date = fromDate.format("YYYY-MM");
      labels.push(date);
      fromDate.add(1, "M");
      safe++;
    }

    for (const item of selected) {
      if (
        results[item.mnemotecnico] &&
        results[item.mnemotecnico][timeFilter]
      ) {
        const dataset = {};
        const barra = results[item.mnemotecnico][timeFilter];
        dataset["name"] = item.nombre;
        dataset["data"] = [];
        for (const label of labels) {
          if (barra[label]) {
            dataset["data"].push(barra[label][moneyFilter]);
          } else {
            dataset["data"].push(0);
          }
        }
        datasets.push(dataset);
      }
    }
    return { categories: labels, datasets };
  } catch (error) {
    console.log(error);
    return { categories: [], datasets: [] };
  }
};

const yearlyData = ({
  selected,
  timeFilter,
  moneyFilter,
  from,
  to,
  results
}: {
  selected: Array<Object>,
  timeFilter: string,
  moneyFilter: string,
  from: string,
  to: string,
  results: Object
}) => {
  try {
    const labels = [];
    const datasets = [];
    const fromDate = from.clone().startOf("y");
    const toDate = to.clone().endOf("y");
    let safe = 0;
    while (safe < 10000 && !fromDate.isSameOrAfter(toDate)) {
      const date = fromDate.format("YYYY");
      labels.push(date);
      fromDate.add(1, "y");
      safe++;
    }

    for (const item of selected) {
      if (
        results[item.mnemotecnico] &&
        results[item.mnemotecnico][timeFilter]
      ) {
        const dataset = {};
        const barra = results[item.mnemotecnico][timeFilter];
        dataset["name"] = item.nombre;
        dataset["data"] = [];
        for (const label of labels) {
          if (barra[label]) {
            dataset["data"].push(barra[label][moneyFilter]);
          } else {
            dataset["data"].push(0);
          }
        }
        datasets.push(dataset);
      }
    }
    return { categories: labels, datasets };
  } catch (error) {
    console.log(error);
    return { categories: [], datasets: [] };
  }
};

export const formatService = {
  hourlyData,
  dailyData,
  monthlyData,
  yearlyData
};
