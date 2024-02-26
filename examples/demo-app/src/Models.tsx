import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Model } from '@ai-mask/sdk';
import { useAIMask } from './context';

export default function Models({ task }: { task: Model['task'] }) {
  const { aiMaskClient, selectedModel, setSelectedModel } = useAIMask()

  const [models, setModels] = useState<Model[]>([])
  const [taskModels, setTaskModels] = useState<Model[]>([])

  useEffect(() => {
    if (!aiMaskClient) return
    aiMaskClient.getModels().then(models => {
      setModels(models)
      setSelectedModel(models[0])
    })
  }, [aiMaskClient, setModels, setSelectedModel])

  useEffect(() => {
    const taskModels = models.filter(m => m.task === task)
    setTaskModels(taskModels)
    setSelectedModel(taskModels[0])
  }, [task, models, setTaskModels])

  const changeModel = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const modelId = e.target.value
    const model = models.find(m => m.id === modelId)
    if (model) setSelectedModel(model)
  }, [models, setSelectedModel])

  if (!aiMaskClient) {
    return (
      <div className="">
        <p>Not ready</p>
      </div>
    )
  }

  return (
    <div className="">
      <h2 className='mb-2'>Model</h2>
      <select
        className=''
        value={selectedModel?.id}
        onChange={changeModel}
      >
        {taskModels.map(model => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  )
}