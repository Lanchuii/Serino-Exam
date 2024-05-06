import { db } from "../db/database.js";
import MoneyValue from "../models/money_value.js";
import { getDistance } from "geolib";
import Treasure from "../models/treasure.js";

// filter MONEY_VALUES depending on the prize value provided
export default function getNearbyTreasure(
  lat: number,
  lng: number,
  distance: 1 | 10,
  prizeVal: number | undefined
) {
  // filter money values based on prize value unless prize value is undefined
  const moneyValues = db.prepare("SELECT * FROM MONEY_VALUES WHERE amount >= ?").all(prizeVal ?? 0) as MoneyValue[];

  // filter the minimum amount for each treasure ID
  const moneyValuesMap = new Map<number, number>();
  for (const moneyValue of moneyValues) {
    // check if treasure id already exists within the map
    const amount = moneyValuesMap.get(moneyValue.treasure_id);
    // skip if amount found within the map is less than the current amount
    if (amount && amount < moneyValue.amount) continue
    moneyValuesMap.set(moneyValue.treasure_id, moneyValue.amount)
  }
  // get treasures based on their money values
  const treasures = [...moneyValuesMap.entries()].map((moneyValues) => {
    const [treasure_id, amount] = moneyValues;

    const treasure = db.prepare("SELECT * FROM TREASURES WHERE id = ?").get(treasure_id) as Treasure;
    // calculate distance between user's input and treasure
    const distance = getDistance(
      { lat, lng },
      { lat: treasure.latitude, lng: treasure.longitude }
    ) / 1000;

    return {
      ...treasure,
      amount,
      distance
    };
  });
  // filter treasure found within given distance and sort from nearest to furthest
  return treasures.filter((treasure) => treasure.distance <= distance).sort((a, b) => a.distance - b.distance);
}