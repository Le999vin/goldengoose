let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice, productImage, productDescription) {
    cart.push({ name: productName, price: productPrice, image: productImage, description: productDescription });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} wurde dem Warenkorb hinzugefügt.`);
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Warenkorb ist leer</p>';
    } else {
        const ul = document.createElement('ul');
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.width = '100px';

            const name = document.createElement('span');
            name.textContent = `${item.name} - ${item.price} CHF`;

            const description = document.createElement('p');
            description.textContent = item.description;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Entfernen';
            removeButton.onclick = () => removeFromCart(index);

            li.appendChild(img);
            li.appendChild(name);
            li.appendChild(description);
            li.appendChild(removeButton);

            ul.appendChild(li);
            total += item.price;
        });

        cartElement.appendChild(ul);
        const totalElement = document.createElement('p');
        totalElement.textContent = `Gesamt: ${total} CHF`;
        cartElement.appendChild(totalElement);
    }
}

function completeOrder() {
    if (cart.length === 0) {
        alert('Der Warenkorb ist leer. Fügen Sie Artikel hinzu, bevor Sie eine Bestellung aufgeben.');
    } else {
        alert('Ihre Bestellung wurde erfolgreich abgeschlossen.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Stelle sicher, dass der Einkaufswagen beim Laden der Seite angezeigt wird.
if (document.getElementById('cart')) {
    displayCart();
}
