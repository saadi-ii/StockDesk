import { File, Paths } from 'expo-file-system';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const productFile = new File(Paths.document, "product.txt");


const readProducts = (): { name: string; quantity: number }[] => {
  return JSON.parse(productFile.textSync());
};

const index = () => {
  const [Products, setProducts] = useState<{ name: string; quantity: number }[]>(readProducts);
  const [Name, setName] = useState("");
  const [Quantity, setQuantity] = useState("");

  useEffect(() => {
    if (!productFile.exists) productFile.create();
    productFile.write(JSON.stringify(Products));
  }, [Products]);

  const addData = () => {
    if (Name && Quantity) {
      if (Products.some((product) => product.name === Name)) {
        setProducts(
          Products.map((product) =>
            product.name === Name
              ? { ...product, quantity: parseInt(Quantity) }
              : product
          )
        );
      } else {
        setProducts([...Products, { name: Name, quantity: parseInt(Quantity) }]);
      }
      setName("");
      setQuantity("");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
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


      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Product Name"
          style={styles.inputField}
          value={Name}
          onChangeText={setName}
          placeholderTextColor="#afb1af"
        />
        <TextInput
          placeholder="Product Quantity"
          style={styles.inputField}
          value={Quantity}
          onChangeText={setQuantity}
          placeholderTextColor="#afb1af"
        />
        <Pressable style={styles.button} onPress={() => {
          addData();
        }}>
          <Text style={styles.buttonText}>Add Product</Text>
        </Pressable>
      </View>


      <View>
        <Text style={styles.heading}>All Products in the stock</Text>

        <FlatList
          data={Products}
          style={styles.list}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                item.quantity < 20 && { backgroundColor: "#fcd9d9" }
              ]}
            >
              <Text style={styles.cardText}>{item.name}</Text>
              <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <Text style={styles.cardText}>{item.quantity}</Text>
                <Pressable
                  onPress={() => {
                    setName(item.name);
                    setQuantity(item.quantity.toString());
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setProducts(Products.filter((product) => product.name !== item.name));
                  }}
                >
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
    width: "100%",
    height: "100%"
  },
  heading: {
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

  inputContainer: {
    marginTop: 20,
    width: "90%",
    padding: 5,
    paddingHorizontal: 10,
    gap: 10,
  },

  inputField: {
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#91d191",
    borderRadius: 5,
    color: "black",
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
    width: "90%",
    marginTop: 20
  }

})