const Input = ({placeholder, state, setState}) => {
    return (
        <input
            className="rounded px-2 py-1 mx-1 border-2 border-accent"
            placeholder={placeholder}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
    );
}

export default Input;