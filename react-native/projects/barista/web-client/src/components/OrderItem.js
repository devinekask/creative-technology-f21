import styles from "./OrderItem.module.css";

const OrderItem = ({ order, onRemoveOrder }) => {
  return (
    <li className={styles.order}>
      <span className={styles.order__name}>
        <span className={styles.order__amount}>{order.amount}x</span>{" "}
        {order.coffee.name}
      </span>
      <span className={styles.order__price}>
        &euro;{order.coffee.price * order.amount}
      </span>
      <button
        className={styles.order__remove}
        onClick={() => {
          onRemoveOrder(order);
        }}
      >
        x
      </button>
    </li>
  );
};

export default OrderItem;
