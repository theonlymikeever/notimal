export function isVegan (labels){
    console.log('searching labels: ', labels)
    if (labels.indexOf('VEGAN') !== -1){
      return '/images/broccoli.png'
    } else if (labels.indexOf('VEGETARIAN') !== -1){
      return '/images/broccoli.png'
    } else {
      return '/images/steak.png'
    }
  }
