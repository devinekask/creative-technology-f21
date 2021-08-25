import styles from "./CoffeeItem.module.css";

const CoffeeItem = ({ coffee, onAdd }) => {
  return (
    <li className={styles.price}>
      <button
        className={styles.price__button}
        onClick={() => {
          onAdd(coffee);
        }}
      >
        <span className={styles.price__button__wrapper}>
          <span className={styles.price__button__name}>{coffee.name}</span>
          <span className={styles.price__button__amount}>
            &euro;{coffee.price}
          </span>
        </span>
        <span className={styles.price__button__plus}>+</span>
      </button>
    </li>
  );
};

export default CoffeeItem;
