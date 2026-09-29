import { File, Paths } from 'expo-file-system';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const productFile = new File(Paths.document, "product.txt");
const readProducts = (): { name: string; quantity: number }[] => {
  if (!productFile.exists) return [];
  return JSON.parse(productFile.textSync());
};

const Create = () => {
  const router = useRouter();

  const [Products, setProducts] = useState<{ name: string; quantity: number }[]>(readProducts);
  const [Name, setName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const addData = () => {
    if (Name && Quantity) {
      const updated = Products.some((product) => product.name === Name)
        ? Products.map((product) =>
            product.name === Name
              ? { ...product, quantity: parseInt(Quantity) }
              : product
          )
        : [...Products, { name: Name, quantity: parseInt(Quantity) }];

      setProducts(updated);
      if (!productFile.exists) productFile.create();
      productFile.write(JSON.stringify(updated));

      setName("");
      setQuantity("");
      router.navigate("/");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Product</Text>
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
      </View>
    </View>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
    width: "100%",
    height: "100%"
  },
  heading: {
    fontSize: 25,
    margin: 15,
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

  

})