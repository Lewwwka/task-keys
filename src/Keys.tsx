import { IItem } from './index';
import { useEffect, useState } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [list, setList] = useState(props.initialData);
    const [sort, setSort] = useState(props.sorting);
    const [id, setId] = useState(-1);
    const [click, setClick] = useState(false);
    const [newStr, setNewStr] = useState('');

    useEffect(() => {
        function sort() {
            if (props.sorting === 'ASC') {
                setList(list.sort((x, y) => x.id - y.id));
                setSort(props.sorting);
            } else {
                setList(list.sort((x, y) => y.id - x.id));
                setSort(props.sorting);
            }
        }
        sort();
    }, [props.sorting]);

    return (
        <div>
            {list.map((item) => {
                if (!click || item.id !== id) {
                    return (
                        <div
                            key={item.id}
                            onClick={() => {
                                setClick(true);
                                setId(item.id);
                            }}
                        >
                            {item.name}
                        </div>
                    );
                } else {
                    return (
                        <input
                            key={item.id}
                            defaultValue={item.name}
                            type="text"
                            onChange={function (e) {
                                setNewStr(e.target.value);
                            }}
                            onKeyDown={function (e) {
                                if (e.key === 'Escape') {
                                    setClick(false);
                                }
                                if (e.key === 'Enter') {
                                    list.map((newName) => {
                                        if (newName.id === item.id) {
                                            newName.name = newStr;
                                        }
                                    });
                                    setClick(false);
                                    setList(list);
                                }
                            }}
                        />
                    );
                }
            })}
        </div>
    );
}
