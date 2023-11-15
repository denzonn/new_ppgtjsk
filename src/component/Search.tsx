import { FC } from "react"

interface SearchProps {
    placeholder?: string
    value?: string
    name?: string
    onBlur?: (event: any) => void;
    onChange?: (event: any) => void;
}

const Search: FC<SearchProps> = ({placeholder, value, name, onBlur, onChange}) => {
  return (
    <div>
        <input
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className={`bg-transparent focus:outline-none w-full border border-gray-100 px-6 py-2 rounded-lg font-light text-sm`}
          />
    </div>
  )
}

export default Search