import { useState, useRef, useEffect } from 'react'
import { getNames } from 'country-list'
import {
  useDescendant,
  createDescendants,
  useDescendants,
  useDescendantsInit
} from '@lib/desc2'
import matchSorter from 'match-sorter'
const names = getNames()

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}

const Test = () => {
  const [list, setList] = useState(names.slice(0, 2))
  const [show, setShow] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(0)
  const filteredNames = matchSorter(names.slice(0, 5), filter)

  useEffect(() => {
    setSelected(0)
  }, [filter])

  // const [descs, setDescs] = useDescendantsInit()

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <button onClick={() => setList([...list, `hi-${Math.random()}`])}>
        insert item
      </button>
      <br />
      <button
        onClick={() =>
          setList(l => {
            const x = [...l]
            x.pop()
            return x
          })
        }
      >
        remove item
      </button>
      <br />
      <button onClick={() => setShow(s => !s)}>toggle entire list</button>
      <button
        onClick={() =>
          setList(list => {
            const l = [...list]
            shuffle(l)
            return l
          })
        }
      >
        Shuffle
      </button>
      {show && (
        <List>
          {/* {list.map(name => {
            return <Item key={name}>{name}</Item>
          })} */}

          {filteredNames.map(name => {
            return (
              <Item key={name} selected={selected} setSelected={setSelected}>
                {name}
              </Item>
            )
          })}
        </List>
      )}
    </>
  )
}

export default Test

const Descendants = createDescendants()

const List = ({ children }) => {
  const [list, setList] = useState([])
  const { insert, remove } = useDescendants(list, setList)

  return (
    <ul>
      {/* <p>{list.length} items</p> */}
      <Descendants.Provider value={{ insert, remove, list }}>
        {children}
      </Descendants.Provider>
    </ul>
  )
}

const Item = ({ children, selected, setSelected, ...props }) => {
  const ref = useRef()
  const index = useDescendant({ element: ref.current }, Descendants)
  const active = selected === index

  return (
    <li
      ref={ref}
      {...props}
      style={{ color: active ? 'red' : undefined }}
      data-value={children}
      // onMouseOver={() => setSelected(index)}
    >
      Item {children} ({index})
    </li>
  )
}