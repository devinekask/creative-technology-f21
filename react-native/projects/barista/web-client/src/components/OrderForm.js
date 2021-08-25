const OrderForm = ({ onOrder, enabled }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onOrder({
      name: e.target.firstname.value,
      last_name: e.target.lastname.value,
    });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="orderform">
      <label className="form__label">
        First name:
        <input type="text" name="firstname" className="form__input" required />
      </label>
      <label className="form__label">
        Last name:
        <input type="text" name="lastname" className="form__input" required />
      </label>
      <input
        type="submit"
        value="Order"
        className="form__button"
        disabled={!enabled}
      />
    </form>
  );
};

export default OrderForm;
