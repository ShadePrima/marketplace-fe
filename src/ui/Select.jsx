import { Fragment, memo } from 'react'
import cx from 'clsx'
import PropTypes from 'prop-types'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import _map from 'lodash/map'

const Select = ({
  title, label, className, items, labelExtractor, keyExtractor, onSelect, hint,
}) => (
  <Listbox className={className} value={title} onChange={onSelect}>
    {({ open }) => (
      <>
        <Listbox.Label className='block text-sm whitespace-pre-line font-medium text-gray-700 dark:text-gray-100'>{label}</Listbox.Label>
        <div className='mt-1 relative'>
          <Listbox.Button className='relative w-full bg-white border border-gray-300 dark:text-gray-50 dark:border-gray-800 dark:bg-slate-800 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
            <span className='block truncate first-letter:capitalize'>{title}</span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              static
              className='absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
            >
              {_map(items, (item) => (
                <Listbox.Option
                  key={keyExtractor ? keyExtractor(item) : item}
                  className={({ active }) => cx('dark:text-white cursor-default select-none relative py-2 pl-8 pr-4', {
                    'text-white bg-indigo-600': active,
                    'text-gray-900': !active,
                  })}
                  value={labelExtractor ? labelExtractor(item) : item}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={cx(selected ? 'font-semibold' : 'font-normal', 'block truncate capitalize')}>
                        {labelExtractor ? labelExtractor(item) : item}
                      </span>

                      {selected ? (
                        <span
                          className={cx(
                            'absolute inset-y-0 left-0 flex items-center pl-1.5',
                            {
                              'text-white': active,
                              'text-indigo-600': !active,
                            },
                          )}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
        {hint && (
          <p className='mt-2 text-sm text-gray-500 dark:text-gray-300 whitespace-pre-line'>{hint}</p>
        )}
      </>
    )}
  </Listbox>
)

Select.propTypes = {
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.object,
  ])),
  hint: PropTypes.oneOfType([
    PropTypes.string, PropTypes.node,
  ]),
  className: PropTypes.string,
  labelExtractor: PropTypes.func,
  keyExtractor: PropTypes.func,
  label: PropTypes.string,
}

Select.defaultProps = {
  className: '',
  labelExtractor: null,
  keyExtractor: null,
  label: '',
  items: [],
  hint: null,
}

export default memo(Select)
