import React from "react";
import { Button } from "./components/Button";

interface Counter {
  id: string;
  count: number;
}

const data: Counter[] = ["john", "jane", "alice", "bob"].map((id) => ({
  id,
  count: 0,
}));

const SmallExample = () => {
  const [counters, setCounters] = React.useState<Counter[]>(data);

  const [currentCounterId, setCurrentCounterId] = React.useState<string | null>(
    null
  );

  const currentCounterItem = React.useMemo(
    () => counters.find((c) => c.id === currentCounterId),
    [counters, currentCounterId]
  );

  const handleSave = (data: Counter) => {
    setCounters((prev) => prev.map((c) => (c.id === data.id ? data : c)));
  };

  return (
    <div className="p-2">
      <div className="space-x-2">
        {counters.map(({ id, count }) => (
          <Button
            key={id}
            variant="outline"
            onClick={() => setCurrentCounterId(id)}
          >
            {id} ({count})
          </Button>
        ))}
      </div>
      {currentCounterItem && (
        <FormComponent
          // key={currentCounterItem.id}
          initialData={currentCounterItem}
          onSave={handleSave}
          onCancel={() => setCurrentCounterId(null)}
        />
      )}
    </div>
  );
};

export default SmallExample;

interface FormComponentProps {
  initialData: Counter;
  onSave: (data: Counter) => void;
  onCancel: () => void;
}
const FormComponent = ({
  initialData,
  onSave,
  onCancel,
}: FormComponentProps) => {
  const id = initialData.id;
  const [count, setCount] = React.useState(initialData.count);

  return (
    <div className="space-y-2">
      <p>
        {id} has been clicked {count} times
      </p>
      <div className="space-x-2">
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
      </div>
      <div className="space-x-2">
        <Button onClick={() => onSave({ id, count })}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
