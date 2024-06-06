import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const Stock = () => {
  const [spyPrice, setSpyPrice] = useState(null);
  const [qqqPrice, setQqqPrice] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [spyResponse, qqqResponse] = await Promise.all([
          axios.get("https://query1.finance.yahoo.com/v8/finance/chart/SPY"),
          axios.get("https://query1.finance.yahoo.com/v8/finance/chart/QQQ"),
        ]);

        const spyPrice =
          spyResponse.data.chart.result[0].meta.regularMarketPrice.toFixed(2);
        const qqqPrice =
          qqqResponse.data.chart.result[0].meta.regularMarketPrice.toFixed(2);

        setSpyPrice(spyPrice);
        setQqqPrice(qqqPrice);
      } catch (error) {
        console.error("Error fetching stock prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // every 5 seconds the interval take from the api the info by axios

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.stockText}>SPY: {spyPrice}$ </Text>
      <Text style={styles.stockText}> QQQ: {qqqPrice}$</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  stockText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Stock;
