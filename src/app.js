document.addEventListener("alpine:init", () => {
  Alpine.data("groceries", () => ({
    items: [
      { id: 1, name: "Blue Diamond", img: "grc-1.jpg", price: 20000 },
      { id: 2, name: "Mix Bubble", img: "grc-2.jpg", price: 22000 },
      { id: 3, name: "Teal & Yellow Diamond", img: "grc-3.jpg", price: 18000 },
      { id: 4, name: "Mix Hollow", img: "grc-4.jpg", price: 25000 },
      { id: 5, name: "Mix Buttons", img: "grc-5.jpg", price: 30000 },
      { id: 6, name: "Mix & Pink Hollow", img: "grc-6.jpg", price: 28000 },
      { id: 7, name: "Mix Marble", img: "grc-7.jpg", price: 30000 },
      { id: 8, name: "Mix Marble Glosy", img: "grc-8.jpg", price: 32000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apa ada barang yang sama di Cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika Cart Kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika ada item di Cart, Cek apakah item berbeda / sama dengan yang ada di Cart tersebut
        this.items = this.items.map((item) => {
          // Jika Item di Cart Berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika Item di Cart sama, maka tambah Quantity dan Total (subTotal) nya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }

      // console.log(this.total);
    },
    remove(id) {
      // Ambil data Item yang akan diremove berdasarkan ID
      const cartItem = this.items.find((item) => item.id === id);

      // Jika Item > 1
      if (cartItem.quantity > 1) {
        // Telusuri satu persatu Item
        this.items = this.items.map((item) => {
          // Jika bukan barang yang sama atau yang di click
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika Item di Cart tersisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Convert Currency to Rupiah ❤️
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
