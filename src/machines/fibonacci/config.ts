const context = {
    fibonacci: 10,
    first: 0,
    second: 1,
    task_queue: [],
  }

const config = {
    initial: 'idle',
    context,
    states: {
      idle: {
        invoke: {
            src: 'waitForUserEntry'
        },
        on: {
          START: {
            target: 'processing',
            actions: ['assignFibonacciCount'],
          }
        }
      },
      processing: {
        invoke: {
          src: 'fibonacciCalculation'
        },
        on: {
          SEND_TO_PARENT: {
              actions: ['sendToParent']
          },
          UPDATE_FIBONACCI: {
            target: 'fibonacciChecker',
            actions: ['updateFibonacci']
          }
        }
      },
      fibonacciChecker: {
          always:[
            {
                target: 'idle',
                cond: 'fibonacciHasReachedMax',
                actions: ['resetFibonacci', 'log']
            },
            {
                target: 'processing',
            }
        ]
        // on: {
        //   "": [
        //       {
        //         target: 'idle',
        //         cond: 'fibonacciHasReachedMax',
        //         actions: ['resetFibonacci', 'log']
        //       },
        //       {
        //         target: 'processing',
        //       }
        //     ]
        // }
      },
    }
  }

  export default config