import { File, Paths } from 'expo-file-system';
import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const productFile = new File(Paths.document, "product.txt");
const readProducts = (): { name: string; quantity: number }[] => {
  if (!productFile.exists) return [];
  return JSON.parse(productFile.textSync());
};
const LowStock = () => {

  const [Products, setProducts] = useState<{ name: string; quantity: number }[]>(readProducts);
  const [Name, setName] = useState("");
  const [Quantity, setQuantity] = useState("");

  return (


    <View style={styles.container}>
      <Text style={styles.heading}>Low Stock</Text>
      <View style={{
        flexDirection: 'row',
        gap: 10
      }}>
        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>All Items</Text>
          </Pressable>
        </Link>
        <Link href="/LowStock" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Low Stock</Text>
          </Pressable>
        </Link>
        <Link href="/Create" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </Pressable>
        </Link>
      </View>


      <View>
        <Text style={styles.heading}>All Products in the stock</Text>

        <FlatList
          data={Products.filter((item) => item.quantity < 20)}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>

              <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <Text style={styles.cardText}>{item.quantity}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

export default LowStock

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
    width: "100%",
    height: "100%"
  },
  heading: {
    margin: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#91d191",
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    fontSize: 15,
    color: "#91d191",
  },
  card: {
    width: "100%",
    height: 40,
    paddingVertical: -5,
    paddingHorizontal: 10,
    backgroundColor: "#d5fdd5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 5,
  },

  cardText: {
    fontSize: 15,
    color: "black"
  },
  list: {
    width: "90%"
  }


})